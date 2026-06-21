@echo off
echo ========================================
echo  Publicar Raizes do Nordeste no GitHub
echo ========================================
echo.

set PATH=C:\Program Files\Git\bin;C:\Program Files\GitHub CLI;%PATH%
cd /d "%~dp0"

echo Verificando login no GitHub...
gh auth status
if errorlevel 1 (
    echo.
    echo Voce precisa fazer login primeiro.
    echo Execute: gh auth login
    echo Escolha: GitHub.com ^> HTTPS ^> Login via browser
    echo.
    pause
    exit /b 1
)

echo.
echo Criando repositorio publico...
gh repo create raizes-do-nordeste --public --source=. --remote=origin --push

echo.
echo Ativando GitHub Pages...
gh api repos/{owner}/raizes-do-nordeste/pages -X POST -f source[branch]=main -f source[path]=/

echo.
echo Pronto! Aguarde 1-2 minutos e acesse:
echo https://williantramontin.github.io/raizes-do-nordeste/
echo.
pause
