import { ref, watch, computed } from 'vue';

export default function useSearch(items, itemProp) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableUsers = computed(function () {
    let users = [];
    if (activeSearchTerm.value) {
      users = items.filter((usr) =>
        usr[itemProp].includes(activeSearchTerm.value)
      );
    } else if (items) {
      users = items;
    }
    return users;
  });

  watch(enteredSearchTerm, function (newValue) {
    setTimeout(() => {
      if (newValue === enteredSearchTerm.value) {
        activeSearchTerm.value = newValue;
      }
    }, 300);
  });

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }

  return {
    availableUsers,
    updateSearch,
    enteredSearchTerm,
  };
}
