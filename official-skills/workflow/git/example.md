# Examples

## Example 1: Feature Branch Workflow

```bash
git checkout -b feature/user-auth
git add .
git commit -m "feat(auth): add user login endpoint"
git push -u origin feature/user-auth
# Create PR, get review, merge
git checkout main
git pull --rebase
git branch -d feature/user-auth
```

## Example 2: Interactive Rebase to Squash Commits

```bash
git log --oneline
git rebase -i HEAD~3
# Change "pick" to "squash" for commits to combine
# Edit commit message and save
git push --force-with-lease
```
