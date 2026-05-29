import { useState, FormEvent } from "react";
import { Star, MessageCircle, User, ShieldCheck, CornerDownRight, CheckCircle2 } from "lucide-react";
import { CustomerReview } from "../types";
import { CUSTOMER_REVIEWS } from "../data";

export default function ReviewFeedback() {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    text: "",
  });
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Stats
  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
  ).toFixed(1);

  const totalReviewsCount = reviews.length;

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;

    const added: CustomerReview = {
      id: `custom-review-${Date.now()}`,
      author: newReview.author,
      rating: newReview.rating,
      reviewsCount: 1,
      text: newReview.text,
      relativeTime: "Just now",
      ownerResponse: "Thanks for taking the time to share your review! The VIBE team is honored to have you.",
      hasPhoto: false
    };

    setReviews([added, ...reviews]);
    setNewReview({ author: "", rating: 5, text: "" });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 4500);
  };

  return (
    <div id="reviews-section" className="w-full space-y-8">
      {/* Reviews Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-stone-900 border border-stone-800 rounded-2xl p-6">
        <div className="md:col-span-1 flex flex-col justify-center items-center text-center p-4 border-b md:border-b-0 md:border-r border-stone-800">
          <span className="text-5xl font-mono text-amber-500 font-extrabold tracking-tight">4.9</span>
          <div className="flex gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <span className="text-xs text-stone-400 font-mono tracking-wide uppercase">
            Based on {totalReviewsCount} detailed reviews
          </span>
        </div>

        <div className="md:col-span-3 space-y-2 flex flex-col justify-center px-4">
          <h4 className="text-sm font-semibold text-stone-200">100% Recommended in Batumi</h4>
          <p className="text-xs text-stone-400 leading-relaxed max-w-xl">
            Our clients rave about the precision fades of <strong className="text-white">Ilya</strong>, the speed and suggestions of <strong className="text-white font-medium">Vlad</strong>, and the masterpiece beard trims crafted by <strong className="text-white font-medium">Katerina</strong>. Read the real testimonials from our customer community.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-[10px] font-mono bg-stone-950 px-2.5 py-1 rounded-full border border-stone-800 text-stone-300">
              #1 Fade in Georgia
            </span>
            <span className="text-[10px] font-mono bg-stone-950 px-2.5 py-1 rounded-full border border-stone-800 text-stone-300">
              Beard Masterclass
            </span>
            <span className="text-[10px] font-mono bg-stone-950 px-2.5 py-1 rounded-full border border-stone-800 text-stone-300">
              Hot Towel Specialist
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Actual Reviews list */}
        <div className="lg:col-span-7 space-y-5">
          <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-amber-500" /> Client Testimonials Log
          </h4>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-stone-950/40 border border-stone-800/80 rounded-xl p-5 hover:border-stone-700/80 transiton-all duration-300 space-y-3"
              >
                {/* Author row */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 font-bold border border-stone-700 font-mono text-sm uppercase">
                      {rev.author.substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-stone-200">{rev.author}</span>
                        {rev.reviewsCount > 5 && (
                          <span className="text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 font-bold">
                            <ShieldCheck className="w-3 h-3" /> Local Guide
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {rev.reviewsCount} reviews {rev.hasPhoto ? "· 📸 Photo attached" : ""}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">{rev.relativeTime}</span>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                  {Array.from({ length: 5 - rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-stone-800" />
                  ))}
                </div>

                {/* Testimonial message */}
                <p className="text-sm text-stone-300 leading-relaxed font-sans font-light">
                  "{rev.text}"
                </p>

                {/* Owner Response */}
                {rev.ownerResponse && (
                  <div className="bg-stone-900/60 rounded-lg p-3.5 border border-stone-900/80 mt-2 space-y-1 ml-4 ring-1 ring-stone-800/50">
                    <div className="flex items-center justify-between text-[11px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <CornerDownRight className="w-3.5 h-3.5 shrink-0" />
                        VIBE barbershop (owner)
                      </span>
                      <span className="text-stone-500 normal-case font-normal">Response</span>
                    </div>
                    <p className="text-xs text-stone-400 leading-normal pl-4 italic">
                      "{rev.ownerResponse}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* review form */}
        <div className="lg:col-span-5">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sticky top-4">
            <h4 className="text-sm font-semibold text-stone-100 flex items-center gap-2 mb-1">
              Share Your VIBE Experience
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Have you been styled by Vlad, Ilya, or Katerina? Submit an honest review to help others find their perfect look.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star selector */}
              <div>
                <label className="text-[11px] font-mono text-stone-400 block mb-1">YOUR RATING</label>
                <div className="flex gap-1.5 bg-stone-950 p-2 rounded-lg border border-stone-800/80 w-fit">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      type="button"
                      key={starVal}
                      onClick={() => setNewReview({ ...newReview, rating: starVal })}
                      className="text-stone-500 hover:scale-110 active:scale-95 transition-all"
                    >
                      <Star
                        className={`w-6 h-6 stroke-1 ${
                          starVal <= newReview.rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-stone-600 hover:text-stone-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-stone-400 block mb-1">YOUR FULL NAME</label>
                <input
                  type="text"
                  required
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  placeholder="e.g. Richard Feynman"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-all font-sans"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-stone-400 block mb-1">REVIEW COMMENT</label>
                <textarea
                  required
                  rows={4}
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Tell us about the fade, beard lines, staff hospitality, and overall experience..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-all font-sans resize-none"
                />
              </div>

              {showSuccess && (
                <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-2.5 rounded-lg flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <span className="font-bold">Review published successfully!</span>
                    <p className="text-[11px] text-emerald-400/80 mt-0.5">
                      Your review has been cataloged. The owner will respond shortly!
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-stone-100 text-stone-950 rounded-xl font-medium text-xs hover:bg-stone-200 active:bg-stone-300 transition-all cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
