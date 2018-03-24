import React from 'react'
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import Autosuggest from 'react-autosuggest';
import './index.scss';

class TagInput extends React.Component {
  constructor () {
    super()
    this.state = {tags: []}
  }

  handleChange (tags) {
    this.setState({tags})
  }

  render () {
  	let all_tags = this.props.tags;
    function autocompleteRenderInput ({addTag, ...props}) {
      const handleOnChange = (e, {newValue, method}) => {
        if (method === 'enter') {
          e.preventDefault()
        } else {
          props.onChange(e)
        }
      }

      const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
      const inputLength = inputValue.length

      let suggestions = [];
      if (all_tags !== 0) {
      		suggestions = all_tags.filter((state) => {
	        return state.name.toLowerCase().slice(0, inputLength) === inputValue
	      })
	  }

      return (
        <Autosuggest
          ref={props.ref}
          suggestions={suggestions}
          shouldRenderSuggestions={(value) => value && value.trim().length > 0}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
          inputProps={{...props, onChange: handleOnChange}}
          onSuggestionSelected={(e, {suggestion}) => {
            addTag(suggestion.name)
          }}
          onSuggestionsClearRequested={() => {}}
          onSuggestionsFetchRequested={() => {}}
        />
      )
    }

    return <TagsInput renderInput={autocompleteRenderInput} value={this.props.value} onChange={this.props.onChange}/>
  }
}

export default TagInput