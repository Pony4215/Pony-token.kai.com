package setting

import (
	"encoding/json"
	"sync"

	"github.com/QuantumNous/new-api/common"
)

var userUsableGroups = map[string]string{
	"ClaudeCode-Max": "官方max号池，官方缓存",
	"GLM-1": "3.5折新上渠道，官方缓存",
	"GPT-福利": "福利分组会价格变动比较频繁，跟随市场价格变化而变化",
	"Gemini-1": "反重力渠道",
	"Gemini-2": "anti渠道-2",
	"Gemini-3": "Gemini cli渠道",
	"Gemini-4": "支持高并发",
	"KIMI-1": "3.5折新上渠道，官方缓存",
	"Mimo-1": "3.5折新上渠道，官方缓存",
	"Minimax-1": "2.5折新上渠道，官方缓存",
	"Qwen-1": "3.5折新上渠道，官方缓存",
	"claude kiro 逆向": "kiro号池，官方缓存",
	"claude kiro 逆向-3": "kiro 号池，官方缓存",
	"claude-福利": "福利分组会价格变动比较频繁，跟随市场价格变化而变化",
	"codex-plus": "plus号池",
	"codex-plus-2": "稳定plus号池|pro 兜底",
	"codex-pro": "pro号池",
	"codex-pro-2": "低延迟，pro号池,不降智",
	"grok-1": "具备工具调用能力，高缓存500K上下文",
	"国产按次": "禁止写文章小说，只能写代码，自动封号不退款！官方缓存,高并发,极致速度 DeepSeek-V4-Flash 0.05元/次  DeepSeek-V4-Pro 0.1元/次",
	"国产稳定区": "海外大厂自建Deepseek-v4-flash约官方4折|Pro约官方6折（openai协议专用，报400错误切，anthropic协议分组）",
	"国产经济区": "跑脚本换其他区，官方1折，大多为逆向稳定性有限，有质量要求的切稳定区",
	"生图专用": "0.03一张，不会用不要用",
	"default": "默认分组",
	"vip": "vip分组",
	"svip": "svip分组",
}
var userUsableGroupsMutex sync.RWMutex

func GetUserUsableGroupsCopy() map[string]string {
	userUsableGroupsMutex.RLock()
	defer userUsableGroupsMutex.RUnlock()

	copyUserUsableGroups := make(map[string]string)
	for k, v := range userUsableGroups {
		copyUserUsableGroups[k] = v
	}
	return copyUserUsableGroups
}

func UserUsableGroups2JSONString() string {
	userUsableGroupsMutex.RLock()
	defer userUsableGroupsMutex.RUnlock()

	jsonBytes, err := json.Marshal(userUsableGroups)
	if err != nil {
		common.SysLog("error marshalling user groups: " + err.Error())
	}
	return string(jsonBytes)
}

func UpdateUserUsableGroupsByJSONString(jsonStr string) error {
	userUsableGroupsMutex.Lock()
	defer userUsableGroupsMutex.Unlock()

	userUsableGroups = make(map[string]string)
	return json.Unmarshal([]byte(jsonStr), &userUsableGroups)
}

func GetUsableGroupDescription(groupName string) string {
	userUsableGroupsMutex.RLock()
	defer userUsableGroupsMutex.RUnlock()

	if desc, ok := userUsableGroups[groupName]; ok {
		return desc
	}
	return groupName
}
