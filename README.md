This is a test
to test the network open different instances of the terminal
run npm run node_1 to start node 1
run npm run node_2 to start the second node and so on.

in order to make the nodes aware of each other,use postman to hit the register-broadcast endpoint.
node_1 is the bootstrap node. so in order to add node 2 to the network pass {
            "newNodeUrl":"http://localhost:3002"
        }

       to the localhost:3001/register-broadcast endpoint


        do same for others
