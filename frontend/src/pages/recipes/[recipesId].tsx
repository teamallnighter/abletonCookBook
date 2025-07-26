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

import { update, fetch } from '../../stores/recipes/recipesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditRecipes = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'title': '',

    description: '',

    genre: '',

    difficulty_level: '',

    creator: null,

    upload_date: new Date(),

    'rating': '',

    download_count: '',

    license_type: '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { recipes } = useAppSelector((state) => state.recipes)

  const { recipesId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: recipesId }))
  }, [recipesId])

  useEffect(() => {
    if (typeof recipes === 'object') {
      setInitialValues(recipes)
    }
  }, [recipes])

  useEffect(() => {
      if (typeof recipes === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (recipes)[el])

          setInitialValues(newInitialVal);
      }
  }, [recipes])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: recipesId, data }))
    await router.push('/recipes/recipes-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit recipes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit recipes'} main>
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

    <FormField label="Genre" labelFor="genre">
        <Field name="genre" id="genre" component="select">

            <option value="Electronic">Electronic</option>

            <option value="HipHop">HipHop</option>

            <option value="Rock">Rock</option>

            <option value="Jazz">Jazz</option>

            <option value="Classical">Classical</option>

        </Field>
    </FormField>

    <FormField label="DifficultyLevel" labelFor="difficulty_level">
        <Field name="difficulty_level" id="difficulty_level" component="select">

            <option value="Beginner">Beginner</option>

            <option value="Intermediate">Intermediate</option>

            <option value="Advanced">Advanced</option>

        </Field>
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

      <FormField
          label="UploadDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.upload_date ?
                  new Date(
                      dayjs(initialValues.upload_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'upload_date': date})}
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

EditRecipes.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditRecipes
