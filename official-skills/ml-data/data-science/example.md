# Examples

## Example 1: EDA with Pandas

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("data.csv")
print(df.info())
print(df.describe())

numeric_cols = df.select_dtypes(include="number")
correlation = numeric_cols.corr()

sns.heatmap(correlation, annot=True, cmap="coolwarm")
plt.title("Feature Correlation Matrix")
plt.show()
```

## Example 2: Data Transformation

```python
df["date"] = pd.to_datetime(df["date"])
df["month"] = df["date"].dt.month
df["revenue_log"] = df["revenue"].apply(np.log1p)

# Group and aggregate
monthly = df.groupby("month").agg(
    total_revenue=("revenue", "sum"),
    avg_order=("revenue", "mean"),
).reset_index()
```
