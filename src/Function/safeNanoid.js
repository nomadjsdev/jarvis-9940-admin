/**
 * nanoid can sometimes return an id string starting with a number
 * This snippet prefixes the returned ID with a letter to make it web safe
 */

import nanoid from 'nanoid'

const safeNanoid = () => {
	return `a${nanoid()}`
}

export default safeNanoid
