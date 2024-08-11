import { DownOutlined, UpOutlined } from '@vicons/antd'
import { NButton, NForm, NFormItemGi, NGrid, NIcon, NSpace } from 'naive-ui'
import useCols from '~/components/pro-table/query-form/composables/cols'
import { renderField } from '~/components/pro-table/query-form/render-field'
import { queryFormProps } from '~/components/pro-table/query-form/typing'

const queryForm = defineComponent({
  name: 'QueryForm',
  props: {
    ...queryFormProps,
  },
  setup(props) {
    const prefixCls = 'pro-table-query-form'
    const { itemCols, handleReset, handleSearch, collapsed, toggleCollapsed, model, domRef, restCol, cols } = useCols(props)
    return () => {
      const renderItems = () => {
        return itemCols.value.map((item) => {
          return (
            <NFormItemGi
              key={item.key}
              label={item.title}
            >
              {renderField(item, model)}
            </NFormItemGi>
          )
        })
      }
      const renderAction = () => {
        let dom
        if (!collapsed.value) {
          dom = (
            <NSpace size="small">
              展开
              <NIcon>
                <DownOutlined />
              </NIcon>
            </NSpace>
          )
        }
        else {
          dom = (
            <NSpace size="small">
              收起
              <NIcon>
                <UpOutlined />
              </NIcon>
            </NSpace>
          )
        }
        return (
          <NFormItemGi span={restCol.value}>
            <NSpace
              align="center"
              justify="end"
              class="w-100%"
            >
              <NButton
                size="small"
                onClick={handleReset}
              >
                重 置
              </NButton>
              <NButton
                size="small"
                type="primary"
                onClick={handleSearch}
                loading={props.loading}
              >
                查 询
              </NButton>
              <NButton
                text
                type="primary"
                onClick={toggleCollapsed}
              >
                {dom}
              </NButton>
            </NSpace>
          </NFormItemGi>
        )
      }
      return (
        <div
          ref={domRef}
          class={prefixCls}
        >
          <NForm
            showFeedback={false}
            labelPlacement="left"
            model={model}
          >
            <NGrid
              cols={cols.value}
              xGap={12}
              yGap={12}
            >
              {renderItems()}
              {renderAction()}
            </NGrid>
          </NForm>
        </div>
      )
    }
  },
})

export default queryForm
