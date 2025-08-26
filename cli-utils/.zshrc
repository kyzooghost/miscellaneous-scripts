approve() {
    gh pr review $1 --approve
}

git config --global push.autoSetupRemote true

gcap() {
    git commit -am "$1" && git push
}

gpp() {
    git pull --prune
}

gb() {
    git branch
}

gcb() {
    git checkout -b "$1" "$2"
}

gnew() {
    git checkout -b "$1"
}

gwa() {
    git worktree add "$1" "$2"
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
