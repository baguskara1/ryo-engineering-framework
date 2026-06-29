# Troubleshooting

## Common Issues

1. Memory errors with large datasets
2. Merge/join producing unexpected row counts
3. Date/time parsing issues with mixed formats
4. Visualization not rendering in Jupyter
5. Statistical test assumptions violated

## Solutions

1. Read data in chunks (`pd.read_csv(chunksize=)`), use dtypes optimization, or use Dask
2. Check for duplicate keys; use `validate` parameter in merge; inspect with `.shape`
3. Use `pd.to_datetime()` with `format` parameter; use `dayfirst` for ambiguous dates
4. Enable inline plotting: `%matplotlib inline`; check backend with `matplotlib.get_backend()`
5. Check normality with Q-Q plots; use non-parametric tests when assumptions are violated
