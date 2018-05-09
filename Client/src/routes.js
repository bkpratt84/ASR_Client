import Error from './page/Error.vue'
import Success from './page/Success.vue'
import Verify from './page/Verify.vue'

export const routes = [
    {
        path: '/verify/:key',
        name: 'verify',
        component: Verify
    },

    {
        path: '/error',
        name: 'error',
        component: Error
    },

    {
        path: '/success',
        name: 'success',
        component: Success
    },

    {
        path: '*',
        name: '404',
        component: Error,
        props: {
            error: '404'
        }
    }
]