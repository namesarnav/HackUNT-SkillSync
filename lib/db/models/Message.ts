import { Schema, model, models, Model } from 'mongoose';

interface IMessage {
  sessionId: string;
  content: string;
  sender: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  sessionId: { type: String, required: true },
  content: { type: String, required: true },
  sender: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = models.Message || model<IMessage>('Message', messageSchema);
