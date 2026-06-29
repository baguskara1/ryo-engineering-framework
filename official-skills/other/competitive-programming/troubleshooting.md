# Troubleshooting

## Common Issues

1. Time limit exceeded (TLE) on optimal-looking solution
2. Wrong answer on edge cases
3. Stack overflow from deep recursion
4. Integer overflow in large number problems
5. Memory limit exceeded for large inputs

## Solutions

1. Check time complexity; optimize to O(n log n) or better; use faster I/O
2. Test edge cases (empty, single element, max values, negatives)
3. Use iterative approach instead of recursion; increase recursion limit if needed
4. Use 64-bit integers (`long long` in C++, `int64` in Python is unlimited)
5. Use iterative DP with space optimization; avoid storing unnecessary data
