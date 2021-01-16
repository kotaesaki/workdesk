@extends('layouts.app')

@section('content')
<div class="container">
    <img class="image-top" src="{{asset('/images/top.jpg')}}" alt="トップ">

    <div class="row justify-content-center">
        <div class="col-md-12">
            <p>最新の投稿</p>

            <div class="card">

            </div>
        </div>
        <div class="col-md-8">
            <p>人気の投稿</p>
        </div>
        <div class="col-md-4">
            <p>人気のアイテム</p>
        </div>
    </div>
</div>
@endsection