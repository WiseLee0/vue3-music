import { computed, watch, ref, nextTick } from "vue";
import useState from "./use-state";

export default function useCd() {
    const cdRef = ref(null)
    const cdImageRef = ref(null)
    const { playing } = useState();
    const cdCls = computed(() => {
        return playing.value ? "playing" : "";
    });
    watch(playing, (newPlaying) => {
        if (!newPlaying) {
            if (cdRef.value) syncTransform(cdRef.value, cdImageRef.value)
        }
    })

    function syncTransform(wrapper, inner) {
        const wrapperTransform = getComputedStyle(wrapper).transform
        const innerTransform = getComputedStyle(inner).transform
        wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
    }
    return {
        cdCls,
        cdRef,
        cdImageRef
    }
}