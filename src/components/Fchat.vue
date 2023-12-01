<template>
    <div class="fchat">
        <div class="fchat-main">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUAhP////8AgP8Agv8Afv8Ahf/1+/8AiP/7/v/t9//p9f/B4P8fkf8olf/i8f/c7v8Aiv+GwP+m0v/T6v84mv8KjP9/vf+ezv9xtv+Kw/9Wqf+12v+r1f9jrv9Ppf+Sx/9Dn//F4f/L5v+63P/W6/9Vp/93uP8ql/+Yy/+GZ3w/AAALeUlEQVR4nO2d2YKqOBCG7UpARcBdUQHX0/r+Tzig3SokkK1Q0uN/OdNH85mtUqmqdL7+ujrvbkDj+hDarw+h/foQ2q8Pof36ENqvDyGSeq4XTgfHzSaexJvNcTANPbf3mq9umtAd7ierKJ0Fcwee5cyDWRqtJvuh23ALGiR0p/Ei9R1KAQghnbKy/wZAqeOni3jaIGZDhP39NgmcHI0hY0mzHg2S7b7fTFOaIAwniZ81Wwz3hJn9uZ9MwgZag04YLncdqkT3oKSd3RIdEpewv0lGVIfuTklHyQZ3uGISTscBAQO8m4AE4yliq9AIe3HqaA1OVgScNEbbLZEIvUtgNDoZSBpcPJymoRB6Yx+p+54YwR+jMCIQeit8vh/GFQKjMaG7bYbvh3FrbO0YEroT3PnHMNJgYshoRjjYNdZ/d0bYDd5G2I86TfNdGTuRiQ1gQLiZm2/vcoL55g2EXtT4AH2IQKS9quoSDs6v6sCb4Kw7G/UIe6uXzMBnkc5Kz5DTIgxT+mK+XDTVOlnpEA6C147QX0GgM1I1CJcvH6G/Ip3lCwjd6D0deBNEyhaOKqH3lin4EE1Vtw1FwuGLNwlWcB42SXh4mRlTgzg/NEc4GL1rjXkWGSktqSqEx24bADPE7rEZwrYAKiLKE7YHUA1RmnDQIsAcUXouyhIeWrHIPERGsiuqJOFw3i7ADHEuuS/KEfZn798Hy4KZnG9DitBdtw8wQ1xL2ahShNF7bdEq0QiLcNnGHswFMocpCcLBu0FqJLFniAnDoG3L6EMkEDs2hIS9tK1jNBekQveUkHDVzlXmV3RlStjmSXiTaCoKCL1zeyfhTeQscGsICN/qdpITCHbFesJN+wEzxPprm1rCfuvsbZ7IvNZArSW0YIzmqh+ndYTtX0d/Vbee1hC6OxvGaC6yqzll1BBO7BijuWCiQ+i22B4tiwTVnVhNuG23uVYU3aoTer49XZh1ol9p2VQSruyZhbmg0gKvIrSrC+s6sYpwbFcXZp04ViO0rQtrOrGC8GJbF2adeFEh7Fm0F/6KBHyHBp8wtmkv/BWNFQhT+7ow68RUnnDqvLu1WnK4SQxcQuu2ipv4GwaPsG/hOpOLBLzDPo9wYydghsjz2PAIEzsHaTZMEznCcPTulmprxLnG4BAubdwMb6Kc6zYOoTXuGVZkJ0M4fHczjcSGL7CEzQzSF40LzjBlCRtZSSGNXxJxxFlNGcJ+EydD2HkYQVVEaE0Sn9n0GcJ9E4Cz/HS6N7wFIZ2ZL/6jvZBwiz9IYXbbpowQCdlNJI48wLgVGUL8afiIWz5oIxLYbVyZprETsUyI7+km/mMF10QkcI57cnFLrPe7TIh+NCTz0/PH++pDhMBs0pM+0jGHxDJhjDxIyWhf+PyTar5N1n/XLNKtZO9D2ZdRJlzgErLBvGr5DIQGy+v6v5Qd3rAQEOJ6aIjDntjCnTQiAf9ym1byAQWMt6ZE6KLu96TDO5J6klFWOd/P/r2XtxaIX1pqSoRD3IWGf3HZl0IEf/trn0xVfnenZHyXCPeYZjepCo50xYi0+6g2oBY7SPe1hBNEwkrADFGwecN88biFCNWWX1oaOCVCxFtDUnGP8INY81PCaPHkjejLr0y3f126SSwR4kXQVF9ZXtWrRITu9/NM6qnGmJeja0qEaJsFsy0xiPwfE5youFIo28nl7aJI2JshEdJvAWD2Xd9s26EbnYp/9a28MJBZ8Q6qSIhld0Mik1lebn3Wf2WjUmNdKNveRUJvjgMolwnxtXhGBJIwNyvSttqz5sXL4CJhiLLhywJm54U7InTW7M1RrDWinKJbuEg4xVhKIZXPt/6JIodOwknUGjhahFD8qYqEAwRC2KnUWsmdJkD+7Tn/S9cjAMVIxSLhEaHc2k4tnfwCNOXxfZ10DwFQPLAVCc2jntV6MNeEnw4aangDfppQPNAgE4Iocl5WqraaLKGpD+PZ62Qkk3zAkh+jSGgYNEvmSAUPeyY+zVI4LWYfEsVqB9UySnis7UOjtZR097zWntQH7tjolFo7D/cGhMThLYr9cddXHbpatpokoYFNwy0C4F7mVLWOxdfEiE+wHw61CXl+w148u5YcJF2VcmsbPVvtibDOpgm1P5awYXP79LcSNHH4QXU8KTgOqwjr7NKwqwvI+A1PydPNNqnwK7Kamqda1Z4tdM+HjNcpjDrFAc/e63GFkXRcez7UPOOXsx36W7YWEa2Kwy78wgi1G+rP+HqxNLTodepNuDVb4Vvo2ZDwFItV76f50jEHoeh1Os4qarZCIjgZ4xSnqPe1fXH8XyJB9PybHdLqkpi03rthZIw+t6eWUD3ZiT671YaRU9dKWNcdHpGuLgU+b+UQdrp+APYXI0EjIa1GxEqAENxbHBQJ4QF4tdCEf3+uKvOAVl5EcPekuOXDv9+Z1Yvlbq8h4NvhsRYNT4L7Q7VUErhnpw5Sibc6riI+7xCp6Tjkfn79HfDXWuGb7nWMTmtZvrwJ89Iw+kKx1e4fL7jHVyn08TunhmULTdQGphLZEDFMSRiLIe9tg+A64Psr5WqRZFQ8TYWYdbaE8TTSMVG3amLuUqfiLuk+r+gGjkOOhDFRsuEmJPdN9DZnzaLe5GGru6g1X8VxbZJ3rtcVcV9joYl0tzyQbLX75wpjE+V23rym3zQxWuHJz4qAHGYmEV96kpiIxDn0v7uGTbsdSbBTxiVihF2Jq/xRfBFZoBKi2WnqgpwYIBPnLRFw0l3jLO+QLDE+pviRDA9LuBH+rF00Ews9k7N8sOASerr+tlaIPbpw8p5aWehSTnJ5T+iB0C+UZO6a9+fzD/9+Dun/IA/YvrIfN8nncttSp60s+Xz8r8Ofr6lg55aoUhcDI/rr9VKqbdJrfdlSVmr1adpb4LpaajWGmskGblSqdaKaSJZtVqq1vqyr4KJer822al/qNfcsm4k6dRPRnUSNSqf25f+gfunXxB5CvRq0LX8z4Fm6dYQtOmJo1oIu5SW1V/r1vC3ZMUxqstvhWDSpq2/FywFmbyNYUAPT7H0L/aDoF8rojRILipabvTMjc1n6Zhm+FdREUSxcmb73pBFO+2qZvdnltf4NFtN311q/3Ru/nfev5YSSOePVhMjFeNAlm5BbTdjyB9fM3yFtuWMf4S1Zk2TL5oXxHnCrb0kx3nRu9U03yrvcbX7sCedt9RZvhop5xRWEMlGmbxIoZv1XELZ3M4SZYn6/ba+w0Nr0N3lC1QSvlwki+fpFtYQt3QxJR+a4JEOIVPILWxCoFWeoIWznZkhTsctClvBfC9cZ0lnJVLmTIzyJI70JoEWzywnOOiO0ilAUaUKgs1uevhVyDk1FINKuP8UhFJwMgfqLQz5gBudX7SkwVymOIiasK0tHYJQc77m/W9PMICmRTqS6ywsIK8O8s8m3uxTWs6l0+q8+H+x0Z2AVYb9iM7yPzme58bmiRgQSHw0mylaMiJBbdIBAd73hfpV70S6OJ+YDf2vIxyNk7wzztfNSvdvmmcBN9GPGt0Ko4CfOPwTgjM6iwgW3Xosp3xilQqHgjRJCnfVGYiXzLgHqfMzm3wWpAiOT6fy0GWajc1YzOovqbdIOUkdma3Ya65loEoSDeyOB+N+C0VnS4TsgCAVQSTBGKr/IJfw5GRLalRqdJfWP0RyMKhPSUaLxvXUqEV43QwJ0dtEt0+ltkjnVGq7Z12b2rtYJqU7sywHX0Wn0mf3BeNclSpQEsq9NlkjVTwsq1/qio3WMMEp64SSadYlMZ5KMzgmS7R53cN5Vqps42+L9jG44WCazEaE06yCWlORolDp+uoinxpZLtYqEfbQ1+i5velwukl0wdzLb4SFnHszSaDXZDxuEu6o+6gtPrheGp8P+GE/izeY4mIaei/9rcvUqwvfpQ2i/PoT260Novz6E9utDaL8+hPbrPwH/t7HBBbKsAAAAAElFTkSuQmCC"
                alt="" />
            <div class="number-notificate-fchat">
                <span>1</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'F-chat',

}
</script>

<style>
/* body {
    width: 100%;
    height: 100%;
} */

.fchat {
    cursor: pointer;
    position: relative;
}

.fchat-main {
    position: fixed;
    z-index: 999;
    right: 0;
    /* width: 10%; */
    height: 650px;
}

.fchat-main img {
    background-size: cover;
    position: absolute;
    bottom: 100px;
    right: 50px;
    width: 80px;
    height: 80px;
    z-index: 9999;
    background: #fff;
    border-radius: 50%;
}

.number-notificate-fchat {
    position: absolute;
    background-color: red;
    color: white;
    width: 20;
    height: 20;
    border-radius: 50%;
    top: 460px;
    right: 50px;
}

.number-notificate-fchat span {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>