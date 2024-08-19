Paddle.Environment.set("sandbox")
Paddle.Initialize({
  token: 'test_96406623aa9a0b2af2a768b393f',
  pwCustomer: { }
})

const subscriptionPlans = {
  monthly: {
    priceId: 'pri_01j3yykrygkmh960wqmqz3p1nn',
    quantity: 1
  },
  yearly :{  
    priceId: 'pri_01j3yyqbqs9ncga4awv4v3cf5s',
    quantity: 1
  }
}

function openCheckout(item){
  Paddle.Checkout.open({
    items: [subscriptionPlans[item]]
  });
}