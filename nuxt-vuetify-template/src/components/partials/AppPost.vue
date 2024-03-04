<template>
  <app-box>
    <div class="pa-4">
      <header class="d-flex gap-20 align-center">
        <div>
          <app-avatar
            no-detail
            width="70"
            height="70"
            mode="image"
            :src="reactivePost?.author.avatar"
          />
        </div>
        <div class="d-flex flex-column">
          <app-text class="mb-1" as="strong" weight="semibold">
            {{ reactivePost?.author.name }}
          </app-text>
          <app-text as="span" color="text-500">{{ reactivePost?.date }}</app-text>
        </div>
      </header>
      <app-text v-if="reactivePost?.description" as="p" color="text-600" class="my-4">
        {{ reactivePost?.description }}
      </app-text>
    </div>
    <!-- image type -->
    <v-img
      v-if="reactivePost?.mediaUrl && reactivePost?.type == 'image'"
      :src="reactivePost?.mediaUrl"
      width="100%"
      height="100%"
      cover
    />

    <!-- video type -->
    <video
      v-if="reactivePost?.mediaUrl && reactivePost?.type == 'video'"
      width="100%"
      height="500px"
      controls
    >
      <source :src="reactivePost?.mediaUrl" />
    </video>

    <!-- survey type -->
    <div v-if="reactivePost?.type === 'survey'" class="pa-4">
      <v-radio-group v-model="userSelectedSurveyOptionId" class="mt-2">
        <app-box
          v-for="(survey, index) in reactivePost?.survey?.options"
          :key="'survey-option' + index"
          :style="`--percentage-survey-option:${
            (survey.userVotes / survey.totalUserInClass) * 100
          }%`"
          class="pa-3 d-flex align-center flex-wrap mb-4 gap-5 post__survey-option"
          :class="{ 'post__survey-option--show-percentage': Boolean(userSelectedSurveyOptionId) }"
          :border-color="survey.id === userSelectedSurveyOptionId ? 'primary' : 'gray-300'"
          @click="() => handleSelectSurveyOption(survey)"
        >
          <v-radio inline :value="survey.id" />
          <app-text
            v-if="Boolean(userSelectedSurveyOptionId)"
            as="span"
            color="subtitle"
            weight="medium"
          >
            {{ (survey.userVotes / survey.totalUserInClass) * 100 }}%
          </app-text>
          <app-text as="span" class="d-block ms-2" color="primary" weight="semibold">
            {{ survey.text }}
          </app-text>
        </app-box>
      </v-radio-group>
    </div>

    <!-- <embed
      v-if="reactivePost?.mediaUrl && reactivePost?.type == 'video'"
      :src="reactivePost?.mediaUrl"
      width="100%"
      height="333"
    /> -->

    <div v-if="reactivePost?.hasComment" class="pa-4">
      <div v-if="reactivePost?.previewUsersAvatars?.length" class="d-flex align-end">
        <div class="post__users">
          <app-avatar
            v-for="(item, index) in reactivePost?.previewUsersAvatars"
            :key="'avatar' + index"
            mode="image"
            src="https://images.unsplash.com/photo-1682687219356-e820ca126c92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <app-text color="text" size="sm">+{{ reactivePost?.usersLikeCount }} curtidas</app-text>
      </div>

      <div class="separator-bottom mt-2 mb-4"></div>

      <div class="px-4">
        <div class="d-flex align-center justify-space-between flex-wrap gap-5">
          <div class="d-flex align-center gap-30">
            <button class="d-flex align-center gap-5 cursor-pointer" @click="handleChangeLike">
              <ph-heart
                :color="!iLike ? primary : red500"
                size="24"
                :weight="!iLike ? 'regular' : 'fill'"
              />
              <app-text :color="!iLike ? 'primary' : 'red-500'" as="span" weight="medium">
                {{ iLike ? 'Curtiu' : 'Curtir' }}
              </app-text>
            </button>
            <button class="d-flex align-center gap-5">
              <ph-chat-circle :color="primary" size="24" />
              <label for="commentInput" @click="isCommentHidden = false">
                <app-text color="primary" as="span" weight="medium" class="cursor-pointer">
                  Comentar
                </app-text>
              </label>
            </button>
          </div>

          <app-button
            background="gray-50"
            class="d-flex align-center gap-5 px-5"
            @click="toggleCommentContainer"
          >
            <app-text as="strong" color="primary" size="sm" weight="semibold">
              2 comentários
            </app-text>
            <ph-caret-down v-if="isCommentHidden" size="25" :color="primary" />
            <ph-caret-up v-else size="25" :color="primary" />
          </app-button>
        </div>

        <div v-if="reactivePost?.comments.length && !isCommentHidden">
          <div class="d-flex align-center">
            <v-text-field
              id="commentInput"
              v-model="commentValue"
              class="mt-3"
              placeholder="Digite um comentário"
              @click:append="handleSaveComment"
              @keyup.enter="handleSaveComment"
            >
              <template #prepend-inner>
                <ph-chat-circle class="me-3" :color="gray500" size="20" />
              </template>

              <template #append>
                <app-button class="pa-4" @click="handleSaveComment">
                  <ph-paper-plane-right color="white" size="25" />
                </app-button>
              </template>
            </v-text-field>
          </div>
          <div class="post__comments">
            <app-comment
              v-for="(comment, index) in reactivePost?.comments"
              :key="'comment' + index"
              :comment="comment"
            />
          </div>
        </div>
      </div>
    </div>
  </app-box>
</template>

<script setup lang="ts">
import {
  PhHeart,
  PhChatCircle,
  PhCaretDown,
  PhCaretUp,
  PhPaperPlaneRight,
} from '@phosphor-icons/vue'
import { useTheme } from 'vuetify'

import { IComment } from '~/types/globals/comments'

const { $api } = useNuxtApp()

interface ISurveyOption {
  id: number
  text: string
  totalUserInClass: number
  userVotes: number
}

export interface IPost {
  id: number
  author: {
    avatar: string
    name: string
  }
  date: string
  description: string
  mediaUrl?: string
  comments: IComment[]
  iLike: boolean
  previewUsersAvatars: string[]
  usersLikeCount: number

  type: 'video' | 'image' | 'survey'

  hasComment?: boolean

  survey?: {
    title: string
    options: ISurveyOption[]
  }
  surveyUserSelectedOptionId?: number | null
}
interface IProps {
  post: IPost
}

const props = withDefaults(defineProps<IProps>(), {})
const reactivePost = ref<IPost>(props.post)

const isCommentHidden = ref<boolean>(true)
const commentValue = ref<string>('')
const iLike = ref<boolean>(reactivePost.value.iLike ?? false)
const userSelectedSurveyOptionId = ref<number | null>(
  reactivePost.value.surveyUserSelectedOptionId ?? null
)

const theme = useTheme()
const { primary, 'red-500': red500, 'gray-500': gray500 } = theme.current.value.colors

async function handleChangeLike() {
  try {
    const data = await $api<IComment>(`/posts/${props.post.id}`, {
      method: 'GET',
      params: {
        iLike: !iLike.value,
      },
    })

    iLike.value = !iLike.value
  } catch (err) {
    console.log(err)
  }
}
function toggleCommentContainer() {
  isCommentHidden.value = !isCommentHidden.value
}
async function handleSaveComment() {
  try {
    const comment = {
      author: {
        name: 'Davi Guerra',
        photo: 'https://cdn.vuetifyjs.com/images/john.jpg',
      },
      postId: reactivePost?.value.id,
      date: 'Publicado em 27/10',
      text: commentValue.value,
    }

    const data = await $api<IComment>(`/comments`, {
      method: 'POST',
    })

    if (data) {
      reactivePost.value.comments = [...reactivePost?.value.comments, { ...comment, id: data.id }]
    }

    commentValue.value = ''
  } catch (err) {
    console.error(err)
  }
}

function handleSelectSurveyOption(surveyOption: ISurveyOption) {
  if (!userSelectedSurveyOptionId.value) {
    userSelectedSurveyOptionId.value = surveyOption.id
    surveyOption.userVotes++
  }
}
</script>

<style scoped lang="scss">
.post {
  &__users {
    display: flex;

    & > :not(:first-child) {
      margin-left: -15px;
    }
  }

  &__survey-option {
    position: relative;
    isolation: isolate;

    &--show-percentage::after {
      content: '';
      border-radius: inherit;

      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      position: absolute;
      left: 0px;
      top: 0px;
      height: 100%;
      width: var(--percentage-survey-option);
      background: rgb(var(--v-theme-gray-100));
      z-index: -1;
    }
  }
}
</style>
