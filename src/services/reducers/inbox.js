import { INBOX } from '../actions/types';

const initialState = {
    status: true,
    inboxMessages: [],
    sentMessages: [],
    trashMessages: [],
    draftMessages: [],
    unreadIds: []
}

const reduceMsgs = (messages, id) => {
    let one = null;
    let res = messages.reduce((all, msg) => {
        if(msg.id != id)
            all.push(msg);
        else
            one = msg;
        return all;
    }, []);
    return [res, one];
}

const InboxReducer  = (state = initialState, action) => {
    switch(action.type) {
        case INBOX.GET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }

        case INBOX.UPDATE_GMAIL_API_STATUS:
            return {
                ...state,
                status: action.status
            }

        case INBOX.GET_INBOX_MESSAGES:
            return {
                ...state,
                inboxMessages: action.messages
            }

        case INBOX.GET_SENT_MESSAGES:
            return {
                ...state,
                sentMessages: action.messages
            }

        case INBOX.GET_TRASH_MESSAGES:
            return {
                ...state,
                trashMessages: action.messages
            }

        case INBOX.GET_DRAFT_MESSAGES:
            return {
                ...state,
                draftMessages: action.messages
            }

        case INBOX.NEW_SENT_MESSAGE:
            return {
                ...state,
                sentMessages: action.msg.concat(state.sentMessages)
            }

        case INBOX.NEW_DRAFT_MESSAGE:
            return {
                ...state, 
                draftMessages: action.msg.concat(state.draftMessages)
            }

        case INBOX.SET_UNREAD_COUNT:
            return {
                ...state,
                unread_count: action.count,
                unreadIds: action.unreadIds
            }

        case INBOX.TRASH_MESSAGE_BY_IDS:
            let inbox, draft, sent, trash, unreads, one = null;
            [inbox, draft, sent, trash, unreads] = [state.inboxMessages, state.draftMessages, state.sentMessages, state.trashMessages, state.unreadIds];
            action.ids.map(id => {
                let p;
                [inbox, p] = reduceMsgs(inbox, id); one = p || one;
                [draft, p] = reduceMsgs(draft, id); one = p || one;
                [sent, p] = reduceMsgs(sent, id); one = p || one;
                trash = [one].concat(trash)
                unreads = unreads.reduce((all, item) => {
                    if(item != id)
                        all.push(item)
                    return all;
                }, [])
            })
            return {
                inboxMessages: inbox,
                draftMessages: draft,
                sentMessages: sent,
                trashMessages: trash,
                unreadIds: unreads,
                unread_count: unreads.length
            }

        default:
            return state;
    }
}

export default InboxReducer;