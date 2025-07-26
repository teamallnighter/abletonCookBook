import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/recipes/recipesSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    title: '',

    description: '',

    difficulty_level: 'Beginner',

    creator: '',

    upload_date: '',

    rating: '',

    download_count: '',

    license_type: 'CreativeCommons',

}

const RecipesNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/recipes/recipes-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
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

  <FormField label="DifficultyLevel" labelFor="difficulty_level">
      <Field name="difficulty_level" id="difficulty_level" component="select">

        <option value="Beginner">Beginner</option>

        <option value="Intermediate">Intermediate</option>

        <option value="Advanced">Advanced</option>

      </Field>
  </FormField>

  <FormField label="Creator" labelFor="creator">
      <Field name="creator" id="creator" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>

  <FormField
      label="UploadDate"
  >
      <Field
          type="datetime-local"
          name="upload_date"
          placeholder="UploadDate"
      />
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
        label="DownloadCount"
    >
        <Field
            type="number"
            name="download_count"
            placeholder="DownloadCount"
        />
    </FormField>

  <FormField label="LicenseType" labelFor="license_type">
      <Field name="license_type" id="license_type" component="select">

        <option value="CreativeCommons">CreativeCommons</option>

        <option value="Commercial">Commercial</option>

        <option value="Personal">Personal</option>

      </Field>
  </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/recipes/recipes-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

RecipesNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default RecipesNew
