import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/comments_reviews/comments_reviewsSlice'
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

const Comments_reviewsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { comments_reviews } = useAppSelector((state) => state.comments_reviews)

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
              <title>{getPageTitle('View comments_reviews')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View comments_reviews')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/comments_reviews/comments_reviews-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Recipe</p>

                        <p>{comments_reviews?.recipe?.title ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>User</p>

                        <p>{comments_reviews?.user?.firstName ?? 'No data'}</p>

                </div>

                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={comments_reviews?.content} />
                </FormField>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Rating</p>
                  <p>{comments_reviews?.rating || 'No data'}</p>
                </div>

                <FormField label='Timestamp'>
                    {comments_reviews.timestamp ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={comments_reviews.timestamp ?
                        new Date(
                          dayjs(comments_reviews.timestamp).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No Timestamp</p>}
                </FormField>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/comments_reviews/comments_reviews-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Comments_reviewsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default Comments_reviewsView;
