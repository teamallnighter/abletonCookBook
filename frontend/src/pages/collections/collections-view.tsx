import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/collections/collectionsSlice'
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

const CollectionsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { collections } = useAppSelector((state) => state.collections)

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
              <title>{getPageTitle('View collections')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View collections')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/collections/collections-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Title</p>
                    <p>{collections?.title}</p>
                </div>

                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={collections?.description} />
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Creator</p>

                        <p>{collections?.creator?.firstName ?? 'No data'}</p>

                </div>

                <FormField label='IsFeatured'>
                    <SwitchField
                      field={{name: 'is_featured', value: collections?.is_featured}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <FormField label='CreationDate'>
                    {collections.creation_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={collections.creation_date ?
                        new Date(
                          dayjs(collections.creation_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No CreationDate</p>}
                </FormField>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/collections/collections-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

CollectionsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default CollectionsView;
