import { create } from 'zustand';
import secureStore from './secureStore';
import api from './api';
import { log } from "../core/utils"


const useGlobal = create((set) => ({
// initialization state
init: async () => {
		const credentials = await secureStore.get('credentials')
		if (credentials) {
			try {
				const response = await api({
					method: 'POST',
					url: 'signin/',
					data: {
						username: credentials.username,
						password: credentials.password
					}
				})
				if (response.status !== 200) {
					throw 'Authentication error'
				}
				const user = response.data.user
				const tokens = response.data.tokens

				secureStore.set('tokens', tokens)

				set((state) => ({
					initialized: true,
					authenticated: true,
					user: user
				}))
				return
			} catch (error) {
				console.log('useGlobal.init: ', error)
			}
		}
		set((state) => ({
			initialized: true,
		}))
	},








  //authentication state
  authenticated: false,
  user: null,
  login: (credentials ,user) => {
    secureStore.set('credentials', credentials)
    set((state)=> ({
      authenticated: true,
      user: user,
    }))
  },

  logout: () => {
    secureStore.remove('credentials')
    set((state) => ({
      authenticated: false,
      user: {}
    }));
  },
   ///wbsocket state

  socket : null,

  socketConnect: async ()  =>{
	const token = await secure.get('token')
	log('TOKEN',token)
  },
  socketClose: () => {
  }




}));
 





export default useGlobal;
