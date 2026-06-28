# Clean Code Decision Tree

Need to reuse logic?

↓

YES

↓

Extract Function

---

Need to reuse across modules?

↓

Extract Module

---

Function exceeds ~30 lines?

↓

Split into smaller functions

---

Duplicate code found?

↓

Refactor into shared implementation

---

Complex conditional?

↓

Consider polymorphism, strategy pattern, or lookup table

---

Business logic inside UI?

↓

Move to service, hook, or domain layer