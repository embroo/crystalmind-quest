import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare, ThumbsUp, Send } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  product: string;
  comment: string;
  helpfulCount: number;
  verified: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Sarah Jenkins',
    location: 'California, USA 🇺🇸',
    rating: 5,
    date: '2 days ago',
    product: 'Digital Talisman Suite ($4.99)',
    comment:
      'Setting the 528Hz Golden Citrine wallpaper on my iPhone completely transformed my morning focus routine. Looking at the crystal and affirmation every time I unlock my phone keeps my attention anchored. Best $4.99 spent!',
    helpfulCount: 42,
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Marcus K.',
    location: 'London, UK 🇬🇧',
    rating: 5,
    date: '3 days ago',
    product: 'VIP Neuro-Guide Master Suite ($19.99)',
    comment:
      'The Secret 2.0 guide section on the 6 Virtues of Awareness (Serenity, Warmth, Equanimity, Fulfillment, Flexibility, Clarity) is profound. It is grounded in real neuroscience and character intelligence, not empty hype.',
    helpfulCount: 38,
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Elena R.',
    location: 'Berlin, Germany 🇩🇪',
    rating: 5,
    date: '5 days ago',
    product: 'VIP Neuro-Guide Master Suite ($19.99)',
    comment:
      'Instant download right after PayPal checkout. The 15-minute 432Hz master audio helps me fall asleep within 5 minutes every single night. Highly recommended!',
    helpfulCount: 29,
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'David Chen',
    location: 'Vancouver, Canada 🇨🇦',
    rating: 5,
    date: '1 week ago',
    product: 'Digital Talisman Suite ($4.99)',
    comment:
      'No monthly subscription traps! Paid $4.99 once and got 4K wallpapers plus 15-minute master MP3s for all 4 Solfeggio frequencies. Amazing value.',
    helpfulCount: 19,
    verified: true,
  },
];

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Form State
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('United States 🇺🇸');
  const [newProduct, setNewProduct] = useState('VIP Neuro-Guide Master Suite ($19.99)');
  const [newComment, setNewComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleHelpfulClick = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const userRev: Review = {
      id: `user-rev-${Date.now()}`,
      name: newName,
      location: newLocation,
      rating: newRating,
      date: 'Just now',
      product: newProduct,
      comment: newComment,
      helpfulCount: 1,
      verified: true,
    };

    setReviews([userRev, ...reviews]);
    setIsSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setIsSubmitted(false);
      setNewName('');
      setNewComment('');
    }, 2000);
  };

  const filteredReviews =
    activeFilter === 'All'
      ? reviews
      : reviews.filter((r) => r.product.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section className="space-y-8 pt-6">
      {/* Header & Rating Summary */}
      <div className="bg-gradient-to-b from-amber-950/30 via-slate-900/80 to-slate-950 border border-amber-500/30 rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-2xl backdrop-blur-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          VERIFIED COMMUNITY REVIEWS
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
          What 1,420+ Global Buyers Say
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xl font-bold text-amber-200">5.0 / 5.0</span>
          <span className="text-xs text-slate-400">(1,420 Verified Global Ratings)</span>
        </div>
        <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
          Read authentic feedback from high performers and meditators across the US, Europe, and Asia.
        </p>

        {/* Action Button: Write a Review */}
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-6 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-amber-400" />
          {showReviewForm ? 'Close Review Form' : '✍️ Write a Review'}
        </button>
      </div>

      {/* Review Submission Form Drawer */}
      {showReviewForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-black/60 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl backdrop-blur-md"
        >
          <h3 className="text-base font-bold text-amber-200 flex items-center gap-2">
            <Send className="w-4 h-4 text-amber-400" />
            Share Your Experience with CrystalMind AI
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">Your Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Sarah J."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">Country / Location</label>
              <select
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full bg-[#121222] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="United States 🇺🇸">United States 🇺🇸</option>
                <option value="United Kingdom 🇬🇧">United Kingdom 🇬🇧</option>
                <option value="Germany 🇩🇪">Germany 🇩🇪</option>
                <option value="Canada 🇨🇦">Canada 🇨🇦</option>
                <option value="South Korea 🇰🇷">South Korea 🇰🇷</option>
                <option value="Japan 🇯🇵">Japan 🇯🇵</option>
                <option value="Australia 🇦🇺">Australia 🇦🇺</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">Purchased Suite</label>
              <select
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                className="w-full bg-[#121222] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="VIP Neuro-Guide Master Suite ($19.99)">
                  VIP Neuro-Guide Master Suite ($19.99)
                </option>
                <option value="Digital Talisman Suite ($4.99)">
                  Digital Talisman Suite ($4.99)
                </option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">Rating</label>
              <div className="flex items-center gap-1 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setNewRating(star)}
                    className={`w-5 h-5 cursor-pointer ${
                      star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1 font-semibold">Your Feedback / Review</label>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="How did the 528Hz frequencies and lockscreen wallpapers impact your focus?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 font-extrabold text-xs text-black shadow-lg shadow-amber-500/20"
          >
            {isSubmitted ? '✅ Thank you! Review Published!' : 'Submit Verified Review'}
          </button>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
        {['All', 'Talisman', 'Guide'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
              activeFilter === filter
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            {filter === 'All' ? '🌟 All Reviews' : filter === 'Talisman' ? '💎 $4.99 Talisman Reviews' : '📖 $19.99 E-Book Reviews'}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{rev.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{rev.name}</span>
                <span className="text-xs text-slate-400">{rev.location}</span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle className="w-2.5 h-2.5" /> Verified Buyer
                  </span>
                )}
              </div>

              <p className="text-xs text-amber-300/80 font-mono">{rev.product}</p>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-serif italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Was this review helpful?</span>
              <button
                onClick={() => handleHelpfulClick(rev.id)}
                className="hover:text-amber-300 flex items-center gap-1 font-mono transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                Helpful ({rev.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
