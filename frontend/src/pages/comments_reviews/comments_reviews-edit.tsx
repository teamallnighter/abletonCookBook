import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/comments_reviews/comments_reviewsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditComments_reviewsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    recipe: null,

    user: null,

    content: '',

    'rating': '',

    timestamp: new Date(),

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { comments_reviews } = useAppSelector((state) => state.comments_reviews)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof comments_reviews === 'object') {
      setInitialValues(comments_reviews)
    }
  }, [comments_reviews])

  useEffect(() => {
      if (typeof comments_reviews === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (comments_reviews)[el])
          setInitialValues(newInitialVal);
      }
  }, [comments_reviews])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/comments_reviews/comments_reviews-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit comments_reviews')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit comments_reviews'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label='Recipe' labelFor='recipe'>
        <Field
            name='recipe'
            id='recipe'
            component={SelectField}
            options={initialValues.recipe}
            itemRef={'recipes'}

            showField={'title'}

        ></Field>
    </FormField>

  <FormField label='User' labelFor='user'>
        <Field
            name='user'
            id='user'
            component={SelectField}
            options={initialValues.user}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField label="Content" hasTextareaHeight>
        <Field name="content" as="textarea" placeholder="Content" />
    </FormField>

    <FormField
        label="Rating"
    >
        <Field
            type="number"
            name="rating"
            placeholder="Rating"
        />
    </FormField>

      <FormField
          label="Timestamp"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.timestamp ?
                  new Date(
                      dayjs(initialValues.timestamp).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'timestamp': date})}
          />
      </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/comments_reviews/comments_reviews-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditComments_reviewsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditComments_reviewsPage
