approve() {
    gh pr review $1 --approve
}

git config --global push.autoSetupRemote true

alias k=kubectl
alias v=vim
alias claude-yolo="claude --dangerously-skip-permissions"

set-claude() {
    code ~/.claude
}

gpp() {
    git pull --prune
}

gclean() {
    git reset --hard && git clean -fd
}

gs() {
    git status
}

gb() {
    git branch
}

gp() {
    git push
}

gnew() {
    git checkout -b "$1"
}

incognito() {
    HISTFILE=/dev/null
    unset HISTFILE
    HISTSIZE=0
    HISTFILESIZE=0
}

# Custom bash function to switch to 'main' branch in git, and delete the branch we just switched from.
function delswitch() {
    # Get current branch name
    local current_branch=$(git symbolic-ref --short HEAD)
    
    # If we're already on main, inform the user and exit
    if [ "$current_branch" = "main" ]; then
        echo "Already on main branch."
        return 0
    fi
    
    git checkout main
    git branch -D "$current_branch"
    git pull --prune
}
