@echo off
chcp 65001 >nul
echo ========================================
echo  Publicar Raizes do Nordeste no GitHub
echo  Willian Tramontin - RU 4872732
echo ========================================
echo.

set "PATH=C:\Program Files\Git\bin;C:\Program Files\GitHub CLI;%PATH%"
cd /d "%~dp0"

gh auth status >nul 2>&1
if errorlevel 1 (
    echo [1/4] Faca login no GitHub...
    gh auth login -h github.com -p https -w
    if errorlevel 1 (
        echo Erro no login. Tente novamente.
        pause
        exit /b 1
    )
)

echo.
echo [2/4] Enviando codigo para o GitHub...
git branch -M main
git push -u origin main 2>nul
if errorlevel 1 (
    echo Criando repositorio publico...
    gh repo create raizes-do-nordeste --public --source=. --remote=origin --push
) else (
    git push
)

echo.
echo [3/4] Ativando GitHub Pages...
for /f "delims=" %%i in ('gh api user -q .login') do set GHUSER=%%i
gh api -X POST /repos/%GHUSER%/raizes-do-nordeste/pages -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/" 2>nul
if errorlevel 1 (
    echo Pages ja configurado ou atualizando...
    gh api -X PUT /repos/%GHUSER%/raizes-do-nordeste/pages -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"
)

echo.
echo [4/4] Concluido!
echo.
echo Repositorio: https://github.com/%GHUSER%/raizes-do-nordeste
echo Site:        https://%GHUSER%.github.io/raizes-do-nordeste/
echo Wireframes:  https://%GHUSER%.github.io/raizes-do-nordeste/wireframes/
echo.
echo Aguarde 1-2 minutos para o site ficar no ar.
echo Atualize os links no relatorio se seu usuario GitHub for diferente.
echo.
pause
