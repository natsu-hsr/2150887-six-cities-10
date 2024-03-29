import { useEffect } from 'react';
import { FavoriteList } from '../../components/favorite-list/favorite-list';
import { FavoritesEmpty } from '../../components/favorites-empty/favorites-empty';
import { Footer } from '../../components/footer/footer';
import { MemoizedHeader } from '../../components/header/header';
import { Spinner } from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchFavoriteOffers } from '../../store/api-actions';
import { getFavorites, getIsFavoritesLoaded } from '../../store/offer-process/offer-selectors';


export const FavoritesPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteOffers);
  }, []);

  const favorites = useAppSelector(getFavorites);
  const isFavoritesLoaded = useAppSelector(getIsFavoritesLoaded);

  const citiesSet = new Set(favorites.map((fav) => fav.city.name));

  return (
    isFavoritesLoaded ?
      <>
        <MemoizedHeader />
        {
          favorites.length > 0 ?
            <main className="page__main page__main--favorites">
              <div className="page__favorites-container container">
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {Array.from(citiesSet).map((cityName) => <FavoriteList key={cityName} cityName={cityName} offers={favorites.filter((fav) => fav.city.name === cityName)} />)}
                  </ul>
                </section>
              </div>
            </main>
            :
            <FavoritesEmpty />
        }
        <Footer />
      </>
      :
      <Spinner />
  );
};
