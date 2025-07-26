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

import { update, fetch } from '../../stores/collections/collectionsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditCollectionsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'title': '',

    description: '',

    creator: null,

    is_featured: false,

    creation_date: new Date(),

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { collections } = useAppSelector((state) => state.collections)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof collections === 'object') {
      setInitialValues(collections)
    }
  }, [collections])

  useEffect(() => {
      if (typeof collections === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (collections)[el])
          setInitialValues(newInitialVal);
      }
  }, [collections])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/collections/collections-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit collections')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit collections'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="Title"
    >
        <Field
            name="title"
            placeholder="Title"
        />
    </FormField>

    <FormField label="Description" hasTextareaHeight>
        <Field name="description" as="textarea" placeholder="Description" />
    </FormField>

  <FormField label='Creator' labelFor='creator'>
        <Field
            name='creator'
            id='creator'
            component={SelectField}
            options={initialValues.creator}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField label='IsFeatured' labelFor='is_featured'>
        <Field
            name='is_featured'
            id='is_featured'
            component={SwitchField}
        ></Field>
    </FormField>

      <FormField
          label="CreationDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.creation_date ?
                  new Date(
                      dayjs(initialValues.creation_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'creation_date': date})}
          />
      </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/collections/collections-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditCollectionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditCollectionsPage
