<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use RakutenRws_Client;

class ItemController extends Controller
{
    public function Index(Request $request){
        $client = new RakutenRws_Client();

        define('RAKUTEN_APPLICATION_ID', config('app.rakuten_id'));
        $client->setApplicationId(RAKUTEN_APPLICATION_ID);

        $keyword = $request->searchWords;

        if(!empty($keyword)){
            $response = $client->execute('IchibaItemSearch',array(
                'keyword' => $keyword,
            ));
        }
        if($response->isOk()){
            $items = array();
            foreach ($response as $item) {
                $str = str_replace("_ex=128x128", "_ex=175x175", $item['mediumImageUrls'][0]['imageUrl']);
                $items[] = array(
                    'itemCode' => $item['itemCode'],
                    'itemName' => $item['itemName'],
                    'itemPrice' => $item['itemPrice'],
                    'itemUrl' => $item['itemUrl'],
                    'itemImageUrl' => $str
                );
            }
            return response()->json($items);
        }else{
            echo $response->getMessage();
        }

    }
}
