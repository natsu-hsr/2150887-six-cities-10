import React, { Fragment, useEffect, useState } from 'react';
import { MAX_LENGTH_COMMENT, MIN_LENGTH_COMMENT, REVIEW_FORM_RATING } from '../../constants/reviews';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { getUserInfo } from '../../services/user-info';
import { postReview } from '../../store/api-actions';

export const ReviewForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const isReviewsLoaded = useAppSelector((state) => state.isReviewsLoaded);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => setRating(Number(event.target.value));
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value);

  useEffect(() => {
    setIsButtonDisabled(!(comment.length >= MIN_LENGTH_COMMENT && rating >= 1));
  }, [rating, comment]);

  const currentOffer = useAppSelector((state) => state.currentOffer);
  const userInfo = getUserInfo();

  const onReviewFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(postReview({
      id: currentOffer?.id || -1,
      comment,
      rating,
      date: new Date().toDateString(),
      user: {
        id: userInfo.id,
        name: userInfo.name,
        isPro: userInfo.isPro,
        avatarUrl: userInfo.avatarUrl,
      },
    }));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(event) => onReviewFormSubmit(event)}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          REVIEW_FORM_RATING.map((item) => (
            <Fragment key={item.stars}>
              <input className="form__rating-input visually-hidden" name="rating" value={item.stars} id={`${item.stars}-stars`} type="radio" disabled={!isReviewsLoaded} onChange={handleRatingChange} />
              <label htmlFor={`${item.stars}-stars`} className="reviews__rating-label form__rating-label" title={item.title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea className="reviews__textarea form__textarea" minLength={MIN_LENGTH_COMMENT} maxLength={MAX_LENGTH_COMMENT} id="review" name="review" onChange={handleTextChange} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isButtonDisabled || !isReviewsLoaded}>Submit</button>
      </div>
    </form>
  );
};
