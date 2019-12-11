

const add = (a,b) => a+b


describe('this page',()=>{
	it('shoud add',()=>{
		expect(add(5,6)).toEqual(10)
	})
})