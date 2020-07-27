import * as Yup from 'yup'

Yup.setLocale({
    mixed: {
        default: 'validations:default',
        required: (values) => ({key: 'validations:required', values})
    },
    string: {
        min: ({min}) => 'validations:required',
        max: ({max}) => 'validations:required'
    },
    number: {
        min: (values) => ({key: 'validations:numberMin', values})
    }
})