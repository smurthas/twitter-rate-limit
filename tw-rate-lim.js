if(process.argv[2]) {
    var auth = JSON.parse(require('fs').readFileSync(process.argv[2]));
    if(process.argv[3])
        auth = auth[process.argv[3]];
    require('twitter-js')(auth.consumerKey, auth.consumerSecret).apiCall('GET', '/account/rate_limit_status.json', 
                            { token: { oauth_token_secret: auth.token.oauth_token_secret, oauth_token: auth.token.oauth_token}},
        function(error, rl) {
            if(error) console.error(error);
            else {
                rl.mins_remaining = Math.round((rl.reset_time_in_seconds - new Date().getTime()/1000)/ 6) / 10;
                console.log(rl);
            } 
        });
} else {
    require('request').get({uri:'http://api.twitter.com/1/account/rate_limit_status.json', json:true}, function(err, resp, rl) {
        if(err) console.error(err);
        else {
            rl.mins_remaining = Math.round((rl.reset_time_in_seconds - new Date().getTime()/1000)/ 6) / 10;
            console.log(rl);
        }
    });
}