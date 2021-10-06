import { MissingWalletError, queryClient, txClient } from './module'
// @ts-ignore
import { SpVuexError } from '@starport/vuex'

import { AccountAddr, UserMap, Username } from './module/types/pylons/accounts'
import { Cookbook } from './module/types/pylons/cookbook'
import {
	EventCancelTrade,
	EventCompleteExecution,
	EventCompleteExecutionEarly,
	EventCreateAccount,
	EventCreateCookbook,
	EventCreateExecution,
	EventCreateRecipe,
	EventCreateTrade,
	EventDropExecution,
	EventFulfillTrade,
	EventGooglePurchase,
	EventSendItems,
	EventSetItemString,
	EventStripePurchase,
	EventTransferCookbook,
	EventUpdateAccount,
	EventUpdateCookbook,
	EventUpdateRecipe
} from './module/types/pylons/event'
import { Execution, ItemRecord } from './module/types/pylons/execution'
import { GoogleInAppPurchaseOrder } from './module/types/pylons/google_iap_order'
import { DoubleKeyValue, Item, LongKeyValue, StringKeyValue } from './module/types/pylons/item'
import { CoinIssuer, GoogleInAppPurchasePackage, Params } from './module/types/pylons/params'
import {
	CoinInput,
	CoinOutput,
	ConditionList,
	DoubleInputParam,
	DoubleParam,
	DoubleWeightRange,
	EntriesList,
	IntWeightRange,
	ItemInput,
	ItemModifyOutput,
	ItemOutput,
	LongInputParam,
	LongParam,
	Recipe,
	StringInputParam,
	StringParam,
	WeightedOutputs
} from './module/types/pylons/recipe'
import { ItemRef, Trade } from './module/types/pylons/trade'


export {
	UserMap,
	Username,
	AccountAddr,
	Cookbook,
	EventCreateAccount,
	EventUpdateAccount,
	EventCreateCookbook,
	EventUpdateCookbook,
	EventTransferCookbook,
	EventCreateRecipe,
	EventUpdateRecipe,
	EventCreateExecution,
	EventCompleteExecution,
	EventDropExecution,
	EventCompleteExecutionEarly,
	EventSendItems,
	EventSetItemString,
	EventCreateTrade,
	EventCancelTrade,
	EventFulfillTrade,
	EventGooglePurchase,
	EventStripePurchase,
	ItemRecord,
	Execution,
	GoogleInAppPurchaseOrder,
	DoubleKeyValue,
	LongKeyValue,
	StringKeyValue,
	Item,
	GoogleInAppPurchasePackage,
	CoinIssuer,
	Params,
	DoubleInputParam,
	LongInputParam,
	StringInputParam,
	ConditionList,
	ItemInput,
	DoubleWeightRange,
	DoubleParam,
	IntWeightRange,
	LongParam,
	StringParam,
	CoinOutput,
	ItemOutput,
	ItemModifyOutput,
	EntriesList,
	WeightedOutputs,
	CoinInput,
	Recipe,
	ItemRef,
	Trade
}

async function initTxClient(vuexGetters) {
	return await txClient(vuexGetters['common/wallet/signer'], {
		addr: vuexGetters['common/env/apiTendermint']
	})
}

async function initQueryClient(vuexGetters) {
	return await queryClient({
		addr: vuexGetters['common/env/apiCosmos']
	})
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop] = [...value[prop], ...next_values[prop]]
		} else {
			value[prop] = next_values[prop]
		}
	}
	return value
}

function getStructure(template) {
	let structure = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field: any = {}
		field.name = key
		field.type = typeof value
		structure.fields.push(field)
	}
	return structure
}

const getDefaultState = () => {
	return {
		UsernameByAddress: {},
		AddressByUsername: {},
		Trade: {},
		ListItemByOwner: {},
		GoogleInAppPurchaseOrder: {},
		ListExecutionsByItem: {},
		ListExecutionsByRecipe: {},
		Execution: {},
		ListRecipesByCookbook: {},
		Item: {},
		Recipe: {},
		ListCookbooksByCreator: {},
		Cookbook: {},

		_Structure: {
			UserMap: getStructure(UserMap.fromPartial({})),
			Username: getStructure(Username.fromPartial({})),
			AccountAddr: getStructure(AccountAddr.fromPartial({})),
			Cookbook: getStructure(Cookbook.fromPartial({})),
			EventCreateAccount: getStructure(EventCreateAccount.fromPartial({})),
			EventUpdateAccount: getStructure(EventUpdateAccount.fromPartial({})),
			EventCreateCookbook: getStructure(EventCreateCookbook.fromPartial({})),
			EventUpdateCookbook: getStructure(EventUpdateCookbook.fromPartial({})),
			EventTransferCookbook: getStructure(EventTransferCookbook.fromPartial({})),
			EventCreateRecipe: getStructure(EventCreateRecipe.fromPartial({})),
			EventUpdateRecipe: getStructure(EventUpdateRecipe.fromPartial({})),
			EventCreateExecution: getStructure(EventCreateExecution.fromPartial({})),
			EventCompleteExecution: getStructure(EventCompleteExecution.fromPartial({})),
			EventDropExecution: getStructure(EventDropExecution.fromPartial({})),
			EventCompleteExecutionEarly: getStructure(EventCompleteExecutionEarly.fromPartial({})),
			EventSendItems: getStructure(EventSendItems.fromPartial({})),
			EventSetItemString: getStructure(EventSetItemString.fromPartial({})),
			EventCreateTrade: getStructure(EventCreateTrade.fromPartial({})),
			EventCancelTrade: getStructure(EventCancelTrade.fromPartial({})),
			EventFulfillTrade: getStructure(EventFulfillTrade.fromPartial({})),
			EventGooglePurchase: getStructure(EventGooglePurchase.fromPartial({})),
			EventStripePurchase: getStructure(EventStripePurchase.fromPartial({})),
			ItemRecord: getStructure(ItemRecord.fromPartial({})),
			Execution: getStructure(Execution.fromPartial({})),
			GoogleInAppPurchaseOrder: getStructure(GoogleInAppPurchaseOrder.fromPartial({})),
			DoubleKeyValue: getStructure(DoubleKeyValue.fromPartial({})),
			LongKeyValue: getStructure(LongKeyValue.fromPartial({})),
			StringKeyValue: getStructure(StringKeyValue.fromPartial({})),
			Item: getStructure(Item.fromPartial({})),
			GoogleInAppPurchasePackage: getStructure(GoogleInAppPurchasePackage.fromPartial({})),
			CoinIssuer: getStructure(CoinIssuer.fromPartial({})),
			Params: getStructure(Params.fromPartial({})),
			DoubleInputParam: getStructure(DoubleInputParam.fromPartial({})),
			LongInputParam: getStructure(LongInputParam.fromPartial({})),
			StringInputParam: getStructure(StringInputParam.fromPartial({})),
			ConditionList: getStructure(ConditionList.fromPartial({})),
			ItemInput: getStructure(ItemInput.fromPartial({})),
			DoubleWeightRange: getStructure(DoubleWeightRange.fromPartial({})),
			DoubleParam: getStructure(DoubleParam.fromPartial({})),
			IntWeightRange: getStructure(IntWeightRange.fromPartial({})),
			LongParam: getStructure(LongParam.fromPartial({})),
			StringParam: getStructure(StringParam.fromPartial({})),
			CoinOutput: getStructure(CoinOutput.fromPartial({})),
			ItemOutput: getStructure(ItemOutput.fromPartial({})),
			ItemModifyOutput: getStructure(ItemModifyOutput.fromPartial({})),
			EntriesList: getStructure(EntriesList.fromPartial({})),
			WeightedOutputs: getStructure(WeightedOutputs.fromPartial({})),
			CoinInput: getStructure(CoinInput.fromPartial({})),
			Recipe: getStructure(Recipe.fromPartial({})),
			ItemRef: getStructure(ItemRef.fromPartial({})),
			Trade: getStructure(Trade.fromPartial({}))

		},
		_Subscriptions: new Set()
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(subscription)
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(subscription)
		}
	},
	getters: {
		getUsernameByAddress: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.UsernameByAddress[JSON.stringify(params)] ?? {}
		},
		getAddressByUsername: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.AddressByUsername[JSON.stringify(params)] ?? {}
		},
		getTrade: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.Trade[JSON.stringify(params)] ?? {}
		},
		getListItemByOwner: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.ListItemByOwner[JSON.stringify(params)] ?? {}
		},
		getGoogleInAppPurchaseOrder: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.GoogleInAppPurchaseOrder[JSON.stringify(params)] ?? {}
		},
		getListExecutionsByItem: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.ListExecutionsByItem[JSON.stringify(params)] ?? {}
		},
		getListExecutionsByRecipe: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.ListExecutionsByRecipe[JSON.stringify(params)] ?? {}
		},
		getExecution: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.Execution[JSON.stringify(params)] ?? {}
		},
		getListRecipesByCookbook: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.ListRecipesByCookbook[JSON.stringify(params)] ?? {}
		},
		getItem: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.Item[JSON.stringify(params)] ?? {}
		},
		getRecipe: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.Recipe[JSON.stringify(params)] ?? {}
		},
		getListCookbooksByCreator: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.ListCookbooksByCreator[JSON.stringify(params)] ?? {}
		},
		getCookbook: (state) => (params = { params: {} }) => {
			if (!(<any>params).query) {
				(<any>params).query = null
			}
			return state.Cookbook[JSON.stringify(params)] ?? {}
		},

		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: Pylonstech.pylons.pylons initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					await dispatch(subscription.action, subscription.payload)
				} catch (e) {
					throw new SpVuexError('Subscriptions: ' + e.message)
				}
			})
		},


		async QueryUsernameByAddress({ commit, rootGetters, getters }, {
			options: { subscribe, all } = {
				subscribe: false,
				all: false
			}, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryUsernameByAddress(key.address)).data


				commit('QUERY', { query: 'UsernameByAddress', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryUsernameByAddress',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getUsernameByAddress']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryUsernameByAddress', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryAddressByUsername({ commit, rootGetters, getters }, {
			options: { subscribe, all } = {
				subscribe: false,
				all: false
			}, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryAddressByUsername(key.username)).data


				commit('QUERY', { query: 'AddressByUsername', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryAddressByUsername',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getAddressByUsername']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryAddressByUsername', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryTrade({ commit, rootGetters, getters }, {
			options: { subscribe, all } = { subscribe: false, all: false },
			params: { ...key },
			query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryTrade(key.ID)).data


				commit('QUERY', { query: 'Trade', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryTrade',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getTrade']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryTrade', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryListItemByOwner({ commit, rootGetters, getters }, {
			options: { subscribe, all } = {
				subscribe: false,
				all: false
			}, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryListItemByOwner(key.owner, query)).data


				while (all && (<any>value).pagination && (<any>value).pagination.nextKey != null) {
					let next_values = (await queryClient.queryListItemByOwner(key.owner, {
						...query,
						'pagination.key': (<any>value).pagination.nextKey
					})).data
					value = mergeResults(value, next_values)
				}
				commit('QUERY', { query: 'ListItemByOwner', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryListItemByOwner',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getListItemByOwner']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryListItemByOwner', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryGoogleInAppPurchaseOrder({ commit, rootGetters, getters }, {
			options: {
				subscribe,
				all
			} = { subscribe: false, all: false }, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryGoogleInAppPurchaseOrder(key.PurchaseToken)).data


				commit('QUERY', { query: 'GoogleInAppPurchaseOrder', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryGoogleInAppPurchaseOrder',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getGoogleInAppPurchaseOrder']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryGoogleInAppPurchaseOrder', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryListExecutionsByItem({ commit, rootGetters, getters }, {
			options: {
				subscribe,
				all
			} = { subscribe: false, all: false }, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryListExecutionsByItem(key.CookbookID, key.ItemID, query)).data


				while (all && (<any>value).pagination && (<any>value).pagination.nextKey != null) {
					let next_values = (await queryClient.queryListExecutionsByItem(key.CookbookID, key.ItemID, {
						...query,
						'pagination.key': (<any>value).pagination.nextKey
					})).data
					value = mergeResults(value, next_values)
				}
				commit('QUERY', { query: 'ListExecutionsByItem', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryListExecutionsByItem',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getListExecutionsByItem']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryListExecutionsByItem', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryListExecutionsByRecipe({ commit, rootGetters, getters }, {
			options: {
				subscribe,
				all
			} = { subscribe: false, all: false }, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryListExecutionsByRecipe(key.CookbookID, key.RecipeID, query)).data


				while (all && (<any>value).pagination && (<any>value).pagination.nextKey != null) {
					let next_values = (await queryClient.queryListExecutionsByRecipe(key.CookbookID, key.RecipeID, {
						...query,
						'pagination.key': (<any>value).pagination.nextKey
					})).data
					value = mergeResults(value, next_values)
				}
				commit('QUERY', { query: 'ListExecutionsByRecipe', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryListExecutionsByRecipe',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getListExecutionsByRecipe']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryListExecutionsByRecipe', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryExecution({ commit, rootGetters, getters }, {
			options: { subscribe, all } = {
				subscribe: false,
				all: false
			}, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryExecution(key.ID)).data


				commit('QUERY', { query: 'Execution', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryExecution',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getExecution']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryExecution', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryListRecipesByCookbook({ commit, rootGetters, getters }, {
			options: {
				subscribe,
				all
			} = { subscribe: false, all: false }, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryListRecipesByCookbook(key.CookbookID, query)).data


				while (all && (<any>value).pagination && (<any>value).pagination.nextKey != null) {
					let next_values = (await queryClient.queryListRecipesByCookbook(key.CookbookID, {
						...query,
						'pagination.key': (<any>value).pagination.nextKey
					})).data
					value = mergeResults(value, next_values)
				}
				commit('QUERY', { query: 'ListRecipesByCookbook', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryListRecipesByCookbook',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getListRecipesByCookbook']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryListRecipesByCookbook', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryItem({ commit, rootGetters, getters }, {
			options: { subscribe, all } = { subscribe: false, all: false },
			params: { ...key },
			query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryItem(key.CookbookID, key.ID)).data


				commit('QUERY', { query: 'Item', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryItem',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getItem']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryItem', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryRecipe({ commit, rootGetters, getters }, {
			options: { subscribe, all } = {
				subscribe: false,
				all: false
			}, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryRecipe(key.CookbookID, key.ID)).data


				commit('QUERY', { query: 'Recipe', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryRecipe',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getRecipe']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryRecipe', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryListCookbooksByCreator({ commit, rootGetters, getters }, {
			options: {
				subscribe,
				all
			} = { subscribe: false, all: false }, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryListCookbooksByCreator(key.creator, query)).data


				while (all && (<any>value).pagination && (<any>value).pagination.nextKey != null) {
					let next_values = (await queryClient.queryListCookbooksByCreator(key.creator, {
						...query,
						'pagination.key': (<any>value).pagination.nextKey
					})).data
					value = mergeResults(value, next_values)
				}
				commit('QUERY', { query: 'ListCookbooksByCreator', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryListCookbooksByCreator',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getListCookbooksByCreator']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryListCookbooksByCreator', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async QueryCookbook({ commit, rootGetters, getters }, {
			options: { subscribe, all } = {
				subscribe: false,
				all: false
			}, params: { ...key }, query = null
		}) {
			try {
				const queryClient = await initQueryClient(rootGetters)
				let value = (await queryClient.queryCookbook(key.ID)).data


				commit('QUERY', { query: 'Cookbook', key: { params: { ...key }, query }, value })
				if (subscribe) commit('SUBSCRIBE', {
					action: 'QueryCookbook',
					payload: { options: { all }, params: { ...key }, query }
				})
				return getters['getCookbook']({ params: { ...key }, query }) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryCookbook', 'API Node Unavailable. Could not perform query: ' + e.message)

			}
		},


		async sendMsgCreateTrade({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCreateTrade(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateTrade:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCreateTrade:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgCompleteExecutionEarly({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCompleteExecutionEarly(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCompleteExecutionEarly:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCompleteExecutionEarly:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgUpdateRecipe({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateRecipe(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgUpdateRecipe:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgUpdateRecipe:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgTransferCookbook({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgTransferCookbook(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgTransferCookbook:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgTransferCookbook:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgCancelTrade({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCancelTrade(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCancelTrade:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCancelTrade:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgCreateAccount({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCreateAccount(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateAccount:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCreateAccount:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgCreateRecipe({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCreateRecipe(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateRecipe:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCreateRecipe:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgGoogleInAppPurchaseGetCoins({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgGoogleInAppPurchaseGetCoins(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgGoogleInAppPurchaseGetCoins:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgGoogleInAppPurchaseGetCoins:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgFulfillTrade({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgFulfillTrade(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgFulfillTrade:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgFulfillTrade:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgSetItemString({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgSetItemString(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgSetItemString:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgSetItemString:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgCreateCookbook({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCreateCookbook(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateCookbook:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCreateCookbook:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgUpdateAccount({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateAccount(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgUpdateAccount:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgUpdateAccount:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgUpdateCookbook({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateCookbook(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgUpdateCookbook:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgUpdateCookbook:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgSendItems({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgSendItems(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgSendItems:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgSendItems:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},
		async sendMsgExecuteRecipe({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgExecuteRecipe(value)
				const result = await txClient.signAndBroadcast([msg], {
					fee: {
						amount: fee,
						gas: '200000'
					}, memo
				})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgExecuteRecipe:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgExecuteRecipe:Send', 'Could not broadcast Tx: ' + e.message)
				}
			}
		},

		async MsgCreateTrade({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCreateTrade(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateTrade:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCreateTrade:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgCompleteExecutionEarly({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCompleteExecutionEarly(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCompleteExecutionEarly:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCompleteExecutionEarly:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgUpdateRecipe({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateRecipe(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgUpdateRecipe:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgUpdateRecipe:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgTransferCookbook({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgTransferCookbook(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgTransferCookbook:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgTransferCookbook:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgCancelTrade({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCancelTrade(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCancelTrade:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCancelTrade:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgCreateAccount({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCreateAccount(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateAccount:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCreateAccount:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgCreateRecipe({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCreateRecipe(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateRecipe:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCreateRecipe:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgGoogleInAppPurchaseGetCoins({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgGoogleInAppPurchaseGetCoins(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgGoogleInAppPurchaseGetCoins:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgGoogleInAppPurchaseGetCoins:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgFulfillTrade({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgFulfillTrade(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgFulfillTrade:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgFulfillTrade:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgSetItemString({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgSetItemString(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgSetItemString:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgSetItemString:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgCreateCookbook({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgCreateCookbook(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateCookbook:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgCreateCookbook:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgUpdateAccount({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateAccount(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgUpdateAccount:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgUpdateAccount:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgUpdateCookbook({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateCookbook(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgUpdateCookbook:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgUpdateCookbook:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgSendItems({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgSendItems(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgSendItems:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgSendItems:Create', 'Could not create message: ' + e.message)

				}
			}
		},
		async MsgExecuteRecipe({ rootGetters }, { value }) {
			try {
				const txClient = await initTxClient(rootGetters)
				const msg = await txClient.msgExecuteRecipe(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgExecuteRecipe:Init', 'Could not initialize signing client. Wallet is required.')
				} else {
					throw new SpVuexError('TxClient:MsgExecuteRecipe:Create', 'Could not create message: ' + e.message)

				}
			}
		}

	}
}
