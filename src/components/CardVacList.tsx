import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks'; // свои хуки
import { fetchVacancies } from '../store/vacanciesSlice';
import CardVac from './CardVac';
// import type { CardVacListProps } from '../types/vacancy' оставим на потом))

function CardVacList() {
  const dispatch = useAppDispatch();
  const { items, status, error, currentPage } = useAppSelector(
    (state) => state.vacancies
  );

  useEffect(() => {
    dispatch(fetchVacancies(currentPage.toString()));
  }, [dispatch, currentPage]);

  if (status === 'loading') return <div>Загрузка вакансий...</div>;
  if (status === 'failed') return <div>Ошибка: {error}</div>;

  return (
    <>
      {items.map((vac) => (
        <CardVac
          key={vac.id}
          title={vac.name}
          salary={
            typeof vac.salary === 'string'
              ? vac.salary
              : vac.salary
              ? `${vac.salary.from ?? ''} – ${vac.salary.to ?? ''} ${
                  vac.salary.currency ?? ''
                }`.trim()
              : 'Зарплата не указана'
          }
          experience={
            typeof vac.experience === 'string'
              ? vac.experience
              : vac.experience?.name ?? 'Без опыта'
          }
          company={vac.employer?.name}
          work_format={vac.work_format}
          location={vac.area?.name}
          url={vac.alternate_url} // передача ссылки
        />
      ))}
    </>
  );
}

export default CardVacList;
