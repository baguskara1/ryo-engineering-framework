# Getting Started

## Requirements

- Git
- OpenCode
- macOS, Linux, or Windows (WSL recommended)

---

## Clone Repository

```bash
git clone https://github.com/baguskara1/ryo-engineering-framework.git
```

---

## Create Symbolic Link

```bash
ln -s \
~/Documents/GitHub/ryo-engineering-framework/skills \
~/.config/opencode/skills
```

---

## Verify Installation

```bash
ls -l ~/.config/opencode
```

Expected output:

```text
skills -> /Users/<username>/Documents/GitHub/ryo-engineering-framework/skills
```

---

## Update Framework

```bash
git pull
```

No additional setup is required.