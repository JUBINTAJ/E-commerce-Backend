import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
