<template>
    <div class="comments">
        <div class="comment-content">
            <ul>
                <li>
                    
                </li>
            </ul>
        </div>
        <form v-on:submit.prevent="submit">
            <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
            <button>コメントを送信する</button>
        </form>

    </div>
</template>
<script>
export default {
    
}
</script>