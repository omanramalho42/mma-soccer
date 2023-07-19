import { Schema, model, models } from 'mongoose'

const NewsSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    playerRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true  },
    subtitle: { type: String, required: false  },
    description: { type: String, required: true  },
    slug: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: {
      data: Buffer,
      contentType: String,
    },
    carousel: [{ type: String }],
    tags: [{ type: String }],
    comments: [{ type: String }],
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  });
  
export const News = models.News || model("News", NewsSchema);