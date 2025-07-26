import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/badges/badges-list',
    label: 'Badges',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiStarCircleOutline' in icon ? icon['mdiStarCircleOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_BADGES'
  },
  {
    href: '/categories/categories-list',
    label: 'Categories',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiViewList' in icon ? icon['mdiViewList' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CATEGORIES'
  },
  {
    href: '/challenges/challenges-list',
    label: 'Challenges',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTrophyOutline' in icon ? icon['mdiTrophyOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CHALLENGES'
  },
  {
    href: '/collections/collections-list',
    label: 'Collections',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFolderSpecial' in icon ? icon['mdiFolderSpecial' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_COLLECTIONS'
  },
  {
    href: '/comments_reviews/comments_reviews-list',
    label: 'Comments reviews',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCommentTextOutline' in icon ? icon['mdiCommentTextOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_COMMENTS_REVIEWS'
  },
  {
    href: '/recipes/recipes-list',
    label: 'Recipes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiBookOpenPageVariant' in icon ? icon['mdiBookOpenPageVariant' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_RECIPES'
  },
  {
    href: '/tags/tags-list',
    label: 'Tags',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTagOutline' in icon ? icon['mdiTagOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_TAGS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
