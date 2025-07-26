import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/recipes/recipesSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const RecipesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { recipes } = useAppSelector((state) => state.recipes)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View recipes')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View recipes')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/recipes/recipes-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Title</p>
                    <p>{recipes?.title}</p>
                </div>

                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={recipes?.description} />
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>DifficultyLevel</p>
                    <p>{recipes?.difficulty_level ?? 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Creator</p>

                        <p>{recipes?.creator?.firstName ?? 'No data'}</p>

                </div>

                <FormField label='UploadDate'>
                    {recipes.upload_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={recipes.upload_date ?
                        new Date(
                          dayjs(recipes.upload_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No UploadDate</p>}
                </FormField>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Rating</p>
                  <p>{recipes?.rating || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>DownloadCount</p>
                  <p>{recipes?.download_count || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>LicenseType</p>
                    <p>{recipes?.license_type ?? 'No data'}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Comments_reviews Recipe</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Content</th>

                                <th>Rating</th>

                                <th>Timestamp</th>

                            </tr>
                            </thead>
                            <tbody>
                            {recipes.comments_reviews_recipe && Array.isArray(recipes.comments_reviews_recipe) &&
                              recipes.comments_reviews_recipe.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/comments_reviews/comments_reviews-view/?id=${item.id}`)}>

                                    <td data-label="content">
                                        { item.content }
                                    </td>

                                    <td data-label="rating">
                                        { item.rating }
                                    </td>

                                    <td data-label="timestamp">
                                        { dataFormatter.dateTimeFormatter(item.timestamp) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!recipes?.comments_reviews_recipe?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/recipes/recipes-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

RecipesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default RecipesView;
