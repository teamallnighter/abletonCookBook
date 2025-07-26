import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/users/usersSlice'
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

const UsersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users)

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
              <title>{getPageTitle('View users')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View users')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/users/users-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>First Name</p>
                    <p>{users?.firstName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Last Name</p>
                    <p>{users?.lastName}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Phone Number</p>
                    <p>{users?.phoneNumber}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>E-Mail</p>
                    <p>{users?.email}</p>
                </div>

                <FormField label='Disabled'>
                    <SwitchField
                      field={{name: 'disabled', value: users?.disabled}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>App Role</p>

                        <p>{users?.app_role?.name ?? 'No data'}</p>

                </div>

                <>
                    <p className={'block font-bold mb-2'}>Challenges Winner</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                                <th>Description</th>

                                <th>Theme</th>

                                <th>StartDate</th>

                                <th>EndDate</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.challenges_winner && Array.isArray(users.challenges_winner) &&
                              users.challenges_winner.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/challenges/challenges-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                    <td data-label="description">
                                        { item.description }
                                    </td>

                                    <td data-label="theme">
                                        { item.theme }
                                    </td>

                                    <td data-label="start_date">
                                        { dataFormatter.dateTimeFormatter(item.start_date) }
                                    </td>

                                    <td data-label="end_date">
                                        { dataFormatter.dateTimeFormatter(item.end_date) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.challenges_winner?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Collections Creator</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                                <th>Description</th>

                                <th>IsFeatured</th>

                                <th>CreationDate</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.collections_creator && Array.isArray(users.collections_creator) &&
                              users.collections_creator.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/collections/collections-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                    <td data-label="description">
                                        { item.description }
                                    </td>

                                    <td data-label="is_featured">
                                        { dataFormatter.booleanFormatter(item.is_featured) }
                                    </td>

                                    <td data-label="creation_date">
                                        { dataFormatter.dateTimeFormatter(item.creation_date) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.collections_creator?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Comments_reviews User</p>
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
                            {users.comments_reviews_user && Array.isArray(users.comments_reviews_user) &&
                              users.comments_reviews_user.map((item: any) => (
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
                        {!users?.comments_reviews_user?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Recipes Creator</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                                <th>Description</th>

                                <th>Genre</th>

                                <th>DifficultyLevel</th>

                                <th>UploadDate</th>

                                <th>Rating</th>

                                <th>DownloadCount</th>

                                <th>LicenseType</th>

                            </tr>
                            </thead>
                            <tbody>
                            {users.recipes_creator && Array.isArray(users.recipes_creator) &&
                              users.recipes_creator.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/recipes/recipes-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                    <td data-label="description">
                                        { item.description }
                                    </td>

                                    <td data-label="genre">
                                        { item.genre }
                                    </td>

                                    <td data-label="difficulty_level">
                                        { item.difficulty_level }
                                    </td>

                                    <td data-label="upload_date">
                                        { dataFormatter.dateTimeFormatter(item.upload_date) }
                                    </td>

                                    <td data-label="rating">
                                        { item.rating }
                                    </td>

                                    <td data-label="download_count">
                                        { item.download_count }
                                    </td>

                                    <td data-label="license_type">
                                        { item.license_type }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!users?.recipes_creator?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/users/users-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default UsersView;
