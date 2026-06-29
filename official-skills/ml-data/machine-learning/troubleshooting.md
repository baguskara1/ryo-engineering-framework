# Troubleshooting

## Common Issues

1. Overfitting on training data
2. Data leakage from train/test splits
3. Imbalanced datasets causing poor recall
4. Model not converging during training
5. Inference latency too high for production

## Solutions

1. Use cross-validation, regularization, and early stopping; increase training data
2. Split before any preprocessing; avoid using target information in features
3. Use class weights, oversampling (SMOTE), or undersampling techniques
4. Adjust learning rate, optimizer, batch size; normalize input features
5. Quantize model, use ONNX runtime, or distill to a smaller model
