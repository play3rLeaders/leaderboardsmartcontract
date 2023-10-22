
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.8.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that top 5 scores are returned correctly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
      let wallet_1 = accounts.get("wallet_1")!;
  
      // Arrange: Set up the leaderboard and top scores
      let block = chain.mineBlock([
        Tx.contractCall("leaderboard", "set-player", [types.int(1), types.ascii("player1"), types.uint(900)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-player", [types.int(2), types.ascii("player2"), types.uint(200)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-player", [types.int(3), types.ascii("player3"), types.uint(300)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-player", [types.int(4), types.ascii("player4"), types.uint(400)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-player", [types.int(5), types.ascii("player5"), types.uint(500)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-player", [types.int(6), types.ascii("player6"), types.uint(700)], wallet_1.address),
        
        Tx.contractCall("leaderboard", "set-top-score", [types.uint(1), types.int(6)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-top-score", [types.uint(2), types.int(5)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-top-score", [types.uint(3), types.int(4)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-top-score", [types.uint(4), types.int(3)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-top-score", [types.uint(5), types.int(2)], wallet_1.address),
        Tx.contractCall("leaderboard", "set-top-score", [types.uint(6), types.int(1)], wallet_1.address),
      ]);
  
      // Act: Call the get-top-scores function
      let call = chain.callReadOnlyFn("leaderboard", "get-top-scores", [], wallet_1.address);
  
      // Assert: Check that the top 5 scores are returned correctly
     // assertEquals(call.result, '(ok (({ "name": "player5", "score": 500 }) ({ "name": "player4", "score": 400 }) ({ "name": "player3", "score": 300 }) ({ "name": "player2", "score": 200 }) ({ "name": "player1", "score": 100 })))');
     // assertEquals(call.result, '[(some { "name": "player5", "score": 500 }) ({ "name": "player4", "score": 400 }) ({ "name": "player3", "score": 300 }) ({ "name": "player2", "score": 200 }) ({ "name": "player1", "score": 100 })]');
     assertEquals(call.result, '[(some { "name": "player5", "score": u500 }), (some { "name": "player4", "score": u400 }), (some { "name": "player3", "score": u300 }), (some { "name": "player2", "score": u200 }), (some { "name": "player1", "score": u100 })]');
    },
  });