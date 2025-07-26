import * as icon from '@mdi/js';
import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import BaseIcon from "../components/BaseIcon";

import Link from "next/link";
import { useAppSelector } from '../stores/hooks';
const Dashboard = () => {
    const iconsColor = useAppSelector((state) => state.style.iconsColor);
    const corners = useAppSelector((state) => state.style.corners);
    const cardsStyle = useAppSelector((state) => state.style.cardsStyle);

    const loadingMessage = 'Loading...'

    const [users, setUsers] = React.useState(loadingMessage);
    const [badges, setBadges] = React.useState(loadingMessage);
    const [categories, setCategories] = React.useState(loadingMessage);
    const [challenges, setChallenges] = React.useState(loadingMessage);
    const [collections, setCollections] = React.useState(loadingMessage);
    const [comments_reviews, setComments_reviews] = React.useState(loadingMessage);
    const [recipes, setRecipes] = React.useState(loadingMessage);
    const [tags, setTags] = React.useState(loadingMessage);
    const [roles, setRoles] = React.useState(loadingMessage);
    const [permissions, setPermissions] = React.useState(loadingMessage);

    async function loadData() {
        const entities = ['users','badges','categories','challenges','collections','comments_reviews','recipes','tags','roles','permissions',];
        const fns = [setUsers,setBadges,setCategories,setChallenges,setCollections,setComments_reviews,setRecipes,setTags,setRoles,setPermissions,];

        const requests = entities.map((entity, index) => {
            return axios.get(`/${entity.toLowerCase()}/count`);
        });

        Promise.allSettled(requests).then((results) => {
            results.forEach((result, i) => {
                if (result.status === 'fulfilled') {
                    fns[i](result.value.data.count);
                } else {
                    fns[i](result.reason.message);
                }
            });
        });
    }

  React.useEffect(() => {
      loadData().then();
  }, []);

  return (
    <>
      <Head>
        <title>
            {'Overview'}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
            icon={icon.mdiChartTimelineVariant}
            title={'Overview'}
            main>
          {''}
        </SectionTitleLineWithButton>

        <div id="dashboard" className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'>

            <Link href={'/users/users-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Users
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {users}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiAccountGroup || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/badges/badges-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Badges
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {badges}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiStarCircleOutline' in icon ? icon['mdiStarCircleOutline' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/categories/categories-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Categories
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {categories}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiViewList' in icon ? icon['mdiViewList' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/challenges/challenges-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Challenges
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {challenges}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiTrophyOutline' in icon ? icon['mdiTrophyOutline' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/collections/collections-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Collections
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {collections}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiFolderSpecial' in icon ? icon['mdiFolderSpecial' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/comments_reviews/comments_reviews-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Comments reviews
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {comments_reviews}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiCommentTextOutline' in icon ? icon['mdiCommentTextOutline' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/recipes/recipes-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Recipes
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {recipes}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiBookOpenPageVariant' in icon ? icon['mdiBookOpenPageVariant' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

            <Link href={'/tags/tags-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Tags
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {tags}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiTagOutline' in icon ? icon['mdiTagOutline' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>

        </div>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
