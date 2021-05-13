import { watch, nextTick, ref, computed } from "vue"

export default function useFixed(props) {
    const TITLE_HEIGHT = 30
    const heights = ref([]).value
    const listRef = ref(null)
    const scrollY = ref(0)
    const listIndex = ref(0)
    watch(() => props.data, async () => {
        await nextTick()
        calcPostion()
    })
    watch(scrollY, () => {
        const y = scrollY.value
        for (let i = 0; i < heights.length; i++) {
            const cur = heights[i];
            const next = heights[i + 1];
            if (y > cur && y < next) listIndex.value = i
        }
    })
    const fixedTitle = computed(() => {
        if (scrollY.value < 0) return ''
        return props.data[listIndex.value] ? props.data[listIndex.value].title : ""
    })
    const fixedStyle = computed(() => {
        let diff = heights[listIndex.value + 1] - scrollY.value
        diff = (diff > 0 && diff < TITLE_HEIGHT) ? diff - TITLE_HEIGHT : 0
        return {
            transform: `translate3d(0,${diff}px,0)`
        }
    })
    function calcPostion() {
        const list = listRef.value.children
        heights.length = 0
        heights.push(0)
        let height = 0
        for (const item of list) {
            height += item.clientHeight
            heights.push(height)
        }
    }
    function onScroll({ y }) {
        scrollY.value = -y
    }

    return {
        listRef,
        onScroll,
        fixedTitle,
        fixedStyle,
        listIndex
    }
}