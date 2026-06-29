# Troubleshooting

## Common Issues

1. Virtual environment not activating correctly
2. Import errors due to circular imports or path issues
3. pip dependency resolution conflicts
4. Type hints causing runtime errors
5. Async code not running concurrently

## Solutions

1. Use `python -m venv .venv` then `source .venv/bin/activate`; check shell
2. Use relative imports within packages; check `PYTHONPATH` and `__init__.py` files
3. Use `pip-compile` (pip-tools) or Poetry for deterministic dependencies
4. Type hints are ignored at runtime; use `from __future__ import annotations` to defer eval
5. Use `asyncio.gather()` or `asyncio.create_task()` for concurrency; avoid blocking calls
