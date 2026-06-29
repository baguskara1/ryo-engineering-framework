# Troubleshooting

## Common Issues

1. Merge conflicts during rebase or merge
2. Accidental commits to the wrong branch
3. Large files committed and pushed
4. Detached HEAD state
5. Lost commits after reset

## Solutions

1. Use `git mergetool` or manually resolve conflicts, then `git rebase --continue`
2. Use `git switch -c` to create correct branch, then `git cherry-pick` or reset
3. Use `git filter-branch` or `git filter-repo` to remove large files from history
4. Create a branch from the detached HEAD with `git switch -c new-branch-name`
5. Use `git reflog` to find lost commits and `git reset` or `git cherry-pick` to recover
